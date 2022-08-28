'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputSTO = document.querySelector('.form__input--sto-name');
const inputProvince = document.querySelector('.form__input--province');

class App {
  _compentencies = [];
  #map;
  #mapEvent;

  constructor() {
    // Get user's position
    this._getPosition();
    this._compentency = 'None';

    // Attach event handlers
    inputType.addEventListener('change', this._toggleElevationField);
    form.addEventListener('submit', this._newWorkout);
    containerWorkouts.addEventListener('click', this._moveTo);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        alert('Could not get your position');
      });
    }
  }

  _loadMap = pos => {
    // const { latitude, longitude } = pos.coords;
    const [latitude, longitude] = [13.930552, 121.072022];
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 7);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm);

    // L.marker(coords).addTo(this.#map).bindPopup('You are here').openPopup();

    // Get data from local storage
    this._getSTO();
  };

  _showForm = mapE => {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputProvince.focus();
  };

  _hideForm() {
    inputSTO.value = inputProvince.value = inputType.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField = e => {
    console.log(this._compentency, e.target.value);
    if (
      (this._compentency === 'None' && e.target.value !== 'None') ||
      (this._compentency !== 'None' && e.target.value === 'None')
    ) {
      inputSTO.closest('.form__row').classList.toggle('form__row--hidden');
    }

    this._compentency = e.target.value;
  };

  async _getSTO() {
    const res = await fetch(
      `https://petrosphere.com.ph/sto_tracker/api-get-sto.php?refId=ajngujo082021`
    );
    const jsonSTO = await res.json();

    jsonSTO.forEach(STO => {
      const objSTO = {
        _id: STO._id,
        province: STO.province,
        compentency: STO.compentency,
        STO: STO.STO,
        coords: [STO.latt, STO.longt],
      };

      this._compentencies.push(objSTO);
      this._renderWorkoutList(this._compentencies.at(-1));
      this._renderWorkoutMarker(this._compentencies.at(-1));
    });
  }

  _newWorkout = async e => {
    e.preventDefault();

    const { lat, lng } = this.#mapEvent.latlng;
    console.log(lat, lng);
    const coords = [lat, lng];

    const obj = Object.fromEntries([...new FormData(e.target)]);

    obj.coords = coords;

    // Save STO to database
    const _id = await this._postSTO(obj);
    obj._id = _id;

    console.log(obj);

    this._compentencies.push(obj);
    // Render workout on map as marker
    this._renderWorkoutMarker(this._compentencies.at(-1));

    // Render workout on a list
    this._renderWorkoutList(this._compentencies.at(-1));

    // Reset form + clear form fields
    this._hideForm();
  };

  async _postSTO(uploadData) {
    const res = await fetch(
      `https://petrosphere.com.ph/sto_tracker/api-post-sto.php?refId=ajngujo082021`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploadData),
      }
    );

    const id = await res.text();

    return id;
  }

  // _setLocalStorage() {
  //   localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  // }

  // _getLocalStorage() {
  //   const data = JSON.parse(localStorage.getItem('workouts'));
  //   if (!data) return;

  //   data.forEach(workout => {
  //     this.#workouts.push(
  //       workout.cadence
  //         ? new Running(
  //             workout.distance,
  //             workout.duration,
  //             workout.coords,
  //             workout.cadence,
  //             workout._id,
  //             workout.date
  //           )
  //         : new Cycling(
  //             workout.distance,
  //             workout.duration,
  //             workout.coords,
  //             workout.elevationGain,
  //             workout._id,
  //             workout.date
  //           )
  //     );

  //   });
  // }

  _moveTo = e => {
    const el = e.target.closest('.workout');
    if (el) {
      const _id = el.dataset.id;
      const { coords } = this._compentencies.find(STO => STO._id === _id);

      this.#map.setView(coords, 15, {
        animate: true,
        pan: {
          duration: 1,
        },
      });
    }
  };

  _renderWorkoutList(STO) {
    const markup = `
    <li class="workout sto--${STO.compentency}" data-id="${STO._id}">
      <h2 class="workout__title">${STO.province} - ${
      STO.compentency !== 'none' ? STO.STO : 'None'
    }</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          STO.compentency === 'None'
            ? '🟢'
            : STO.compentency === 'Medium'
            ? '🟡'
            : '🔴'
        }</span>
        <span class="workout__value">${STO.compentency}</span>
        <span class="workout__unit">Compentency</span>
      </div>
    </li>
    `;
    form.insertAdjacentHTML('afterend', markup);
  }

  _renderWorkoutMarker(STO) {
    L.marker(STO.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${STO.compentency}-popup`,
        })
      )
      .setPopupContent(
        `${STO.compentency === 'none' ? 'No STO Available📌' : STO.STO + ' ✨'}`
      )
      .openPopup();
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
(async function () {
  const res = await fetch('https://psgc.gitlab.io/api/provinces/');
  const json = await res.json();

  console.log(json.map(region => region.name).sort());
})();
