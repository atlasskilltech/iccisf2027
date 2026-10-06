/**
 * Editorial copy for About, Theme and Call for Papers.
 * Everything here is drawn from the MOU draft; nothing is invented.
 *
 * ⚠ Theme wording is pending organizer confirmation. The MOU contains two descriptions:
 *   (a) Technical Evaluation: "Broad theme spanning emerging areas of Technology, Design and
 *       Management, with specific tracks to be defined by the Technical Program Committee"
 *   (b) Appendix "Theme Overview & Rationale" (engineering-focused, matches the 9 tracks)
 * The site currently uses (b). (a) is kept below as `theme.alternateScope` and not rendered.
 * Change `theme` here once the organizers confirm the final wording.
 */

export const about = {
  eyebrow: "About the Conference",
  heading: "A unified platform where academia and industry meet at the frontier of intelligent engineering.",
  paragraphs: [
    "As emerging paradigms like Generative AI, Edge Computing, 6G and Autonomous Robotics reshape industry standards, there is a vital need for a unified platform bringing together academia and industry researchers.",
    "Hosted by the UGDx School of Technology at ATLAS SkillTech University, Mumbai, ICCISF2027 provides an interdisciplinary forum highlighting sustainable, resilient and intelligent engineering solutions.",
  ],
  institution: {
    heading: "About ATLAS SkillTech University",
    paragraphs: [
      "ATLAS SkillTech University is a private, UGC-recognized multidisciplinary university established in 2021 under Maharashtra Act No. XV, located at BKC, Kurla West, Mumbai.",
      "It offers industry-aligned undergraduate and postgraduate programs across Design, Technology, Management and Law, with the conference hosted through its UGDx School of Technology.",
    ],
  },
};

export const theme = {
  eyebrow: "Conference Theme",
  statement: "The convergence of intelligence, hardware and interconnected infrastructure.",
  overview:
    "The conference theme focuses on the convergence of intelligence, hardware, and interconnected infrastructure. As emerging paradigms reshape industry standards, ICCISF2027 brings academia and industry researchers together on one interdisciplinary forum.",
  convergence: [
    { label: "Intelligence", icon: "Brain" },
    { label: "Hardware", icon: "Cpu" },
    { label: "Interconnected Infrastructure", icon: "Network" },
  ],
  paradigms: ["Generative AI", "Edge Computing", "6G", "Autonomous Robotics"],
  outcomes: ["Sustainable", "Resilient", "Intelligent"],
  alternateScope:
    "Broad theme spanning emerging areas of Technology, Design and Management, with specific tracks to be defined by the Technical Program Committee",
};

export const callForPapers = {
  eyebrow: "Call for Papers",
  heading: "Share research that moves intelligent, sustainable engineering forward.",
  intro:
    "ICCISF2027 welcomes contributions from academia and industry across the conference's nine indicative tracks — from artificial intelligence and machine learning to robotics, cyber security, VLSI and next-generation communications.",
  pending: "Detailed Call for Papers and submission information will be announced.",
  upcoming: ["Author guidelines", "Submission portal", "Key deadlines", "Paper template"],
};
