export const state = {
  responses: [
    {
      content:
        "The <strong>Founder</strong> of PPCI is Atty. Senforiano B. Alterado",
      keywords: [
        "founder",
        "president",
        "pres",
        "presidente",
        "prisidinti",
        "pres.",
      ],
    },
    {
      content:
        "MATS College of Technology was established in Palawan in 1979, founded by <strong>Atty. Senforiano B. Alterado</strong>, a man of vision and determination. It is the first school that offers maritime and technology courses in the island of Palawan.",
      keywords: ["history", "foundation", "founded"],
    },
    {
      content: `
      <strong>Vision</strong> <br /> <br />
        By 2025, Palawan Polytechnic College, Inc. will be the leading private educational institution within the province in producing globally competitive professionals with solid moral foundation entrusted to face the changing and challenging world.
        `,
      keywords: ["vission", "vision", "vissions", "visions"],
    },
    {
      content: `
      <strong>Mission</strong> <br /><br />
      Palawan Polytechnic College, Inc. aims to provide holistic learning environment which entails responsive and innovative education, values development programs adequate facilities and efficient services.`,
      keywords: ["missions", "mission", "mision", "misions"],
    },
    {
      content: `
        <strong>Tertiary Education Offerings</strong> <br /><br />
        <ul style="padding-left: 20px">
          <li>BS in Nursing</li>
          <li>BS in Civil Engineering</li>
          <li>BS in Mechanical Engineering</li>
          <li>BS in Customs Administration</li>
          <li>BS in Secondary Education (Major in English)</li>
          <li>BS in Hospitality Management (w/ Specialization in Cruise Line Management & Operations)</li>
          <li>BS in Computer Science</li>
          <li>BS in Tourism</li>
          <li>BS in Entrepreneurship</li>
          <br />
          <li>Education Uniting for Non-Education Graduate (1 Sem.)</li>
          <br />
          <li>BS in Marine Transportation (MATS-Davao City)</li>
          <li>BS in Marine Engineering (MATS-Davao City)</li>
        </ul>
      `,
      keywords: ["courses", "offerings", "educations", "course"],
    },
    {
      content: `
      <strong>Admission Requirements</strong> <br /><br />
        <ul style="padding-left: 20px">
          <li>Original Copy of Form 138 (Report Card)</li>
          <li>Certificate of Good Moral Character</li>
          <li>Photocopy of PSA Birth Certificate</li>
          <li>2pcs. of 1x1 Latest ID Picture</li>
        </ul>
      `,
      keywords: [
        "admission requirement",
        "course requirement",
        "requirement to enroll",
        "requirements",
        "enrollment requirement",
      ],
    },
    {
      content: `
      <strong>Scholarship for SHS Graduate with Academic Honors</strong> <br /><br />
        <ul style="padding-left: 20px">
          <li>With Highest Honors</li>
          <li>With High Honors</li>
          <li>With Honors</li>
        </ul>
      `,
      keywords: [
        "shs scholarship",
        "shs scholar",
        "scholarship for shs",
        "scholar for shs",
        "shs graduate scholar",
        "shs graduates scholar",
      ],
    },
    {
      content: `
        <strong>Walk-in & Online Enrollment</strong><br /><br />
        Website link: <br />
        <a href="https://web.facebook.com/palawanpolytechniccollege?_rdc=1&_rdr" target="_blank">fb.me/palawanpolytechniccollege</a>
      `,
      keywords: [
        "online enroll",
        "online-enroll",
        "how to enroll",
        "enroll now",
        "where to enroll",
      ],
    },
    {
      content: `
        <strong>Study Grants</strong><br /><br />
        <ul style="padding-left: 20px">
          <li>Tertiary Education Subsidy (TES)</li>
          <li>CHED Scholarship Program (CSP)</li>
          <li>Tulong Dunong Program (TDP)</li>
          <li>Varsity Scholarship Program (VSP)</li>
          <li>Cultural Arts Scholarship Program (CASP)</li>
          <li>Educational Subsidy for Selected Programs (ESSP)</li>
          <li>Student Assistantship Scholarship Program (SASP)</li>
          <li>Aim Global Discount (AGD)</li>
          <li>Senforiano B. Alterado Memorial Educational Grant (SBAMEG)</li>
        </ul>
      `,
      keywords: ["study grants", "list of grants", "list of study grants"],
    },
  ],
  messages: [
    {
      message: "Hello there! I'm your Digital Assistant.",
      date: Date.now(),
      isSender: false,
      rendered: false,
    },
    {
      message: "Feel free to ask me anything about our school. 🤗",
      date: Date.now(),
      isSender: false,
      rendered: false,
    },
  ],
};

export const addMessage = function (message, isSender = true) {
  state.messages.push({
    message: message,
    date: Date.now(),
    isSender: isSender,
    rendered: false,
  });
};

export const getMessages = function () {
  return state.messages
    .filter((msg) => !msg.rendered)
    .map((msg) => {
      msg.rendered = true;
      return msg;
    });
};

const setError = function () {
  addMessage(
    `
    I'm sorry but I am not quite sure what you are looking for😅
  `,
    false
  );

  return getMessages();
};

export const getResponse = function (request) {
  addMessage(request);

  const data = state.responses.filter((data) =>
    data.keywords.some(
      (keyword) => request.toLowerCase().indexOf(keyword) !== -1
    )
  );

  if (!data.length) return setError();

  data.forEach((data) => addMessage(data.content, false));

  return getMessages();
};
