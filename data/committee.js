/**
 * Committees — the single source for the homepage Committee section, /committee and
 * /committee/[slug]. Published fields ONLY (name, designation, department, affiliation).
 * Never add phone numbers, personal emails or IEEE member IDs here.
 *
 * Source: Conference_Committee_Tracker.xlsx
 *   - "Organizing Committee" tab → 21 rows. Row 1 is Dr Varsha Agrawal, who is the sole
 *     entry on the "Organizing Chair" tab; the Summary tab's Organizing Committee list
 *     names the other 20. She is therefore listed under Organizing Chair only, using the
 *     role and department from her Organizing Committee row.
 *   - "advisory Board" tab → 8 named entries (Summary says 15). Only the fields present
 *     in the tracker are published; missing designations/affiliations are omitted.
 *
 * ⚠ Unpublished until the organizers clarify the tracker (see project notes):
 *   - "Technical Program Committee Chair" tab is titled "Program Chair" and lists 11 people,
 *     but the Summary counts that same tab as the Technical Program Committee's members.
 *   - "Technical Program Committee" tab is titled "Technical Review Committee members"
 *     and lists 5 people; the Summary's Technical Review Committee count is "0+20".
 *   - "Technical Review Committee" tab has no entries.
 *   These three committees render with their status note only. Do not guess a mapping.
 *
 * Other notes:
 *   - The MOU draft lists only 9 core members and leaves the General Chair's name blank
 *     (affiliation "Director, UGDx School of Technology"). The tracker is used here because
 *     it is the newer, committee-specific document marked "Finalized".
 *   - Spellings follow the tracker. Other documents differ:
 *       Kunal Mehar   → "Kunal Meher" in his email signature
 *       Sarika Chouhan → "Sarika Chauhan" (MOU), "Sarika Shekhawat" (email)
 *       Varsha Agrawal → "Varsha Agarwal" (email display name)
 *   - Tracker department shorthand "Tech" is shown as "Technology".
 *   - Dr Sameer S M's tracker affiliation also reads "Director Elect (2025-26)" without
 *     naming the body; that fragment is omitted until confirmed.
 */

const ATLAS = "ATLAS SkillTech University";

/** "Dr. Kunal Mehar" → "kunal-mehar". Honorifics are dropped so slugs survive title changes. */
function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/^(Dr|Prof|Mr|Ms|Mrs)\.?\s+/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Six categories, in display order. A category with no members renders its `statusNote`. */
const categories = [
  {
    id: "organizing-committee",
    title: "Organizing Committee",
    /** department: "Technology" | "Management" | "Design" — drives the filter chips. */
    members: [
      { name: "Dr. Yogesh Jadhav", designation: "Associate Professor", department: "Technology" },
      { name: "Dr. Sarika Chouhan", designation: "Associate Professor", department: "Technology" },
      { name: "Dr. Naresh Kaushik", designation: "Assistant Professor", department: "Technology" },
      { name: "Dr. Kunal Mehar", designation: "Associate Professor", department: "Technology" },
      { name: "Dr. Suman Madan", designation: "Professor", department: "Technology" },
      { name: "Dr. Satish Upadhyay", designation: "Assistant Professor", department: "Technology" },
      { name: "Dr. Ekta Upadhyay", designation: "Associate Professor", department: "Management" },
      { name: "Dr. Priya Harikumar", designation: "Associate Professor", department: "Management" },
      { name: "Dr. Swarna Swetha Kolaventi", designation: "Assistant Professor", department: "Technology" },
      { name: "Dr. Vaishali Amol Gaikwad", designation: "Associate Professor", department: "Technology" },
      { name: "Dr. Peeyush Kumar Gupta", designation: "Assistant Professor", department: "Design" },
      { name: "Dr. Sanjay Gokul Venigalla", designation: "Assistant Professor", department: "Design" },
      { name: "Dr. Kingshuk Mukherjee", designation: "Professor", department: "Design" },
      { name: "Dr. Piya Ghosh", designation: "Assistant Professor", department: "Management" },
      { name: "Dr. Rakhi Raturi", designation: "Assistant Professor", department: "Management" },
      { name: "Dr. Rishika Aggrawal", designation: "Assistant Professor", department: "Management" },
      { name: "Dr. Priti Saxena", designation: "Associate Professor", department: "Management" },
      { name: "Dr. Poonam Singh", designation: "Professor", department: "Management" },
      { name: "Dr. Zuleika Homavazir", designation: "Professor", department: "Management" },
      { name: "Dr. Jyoti Mehndiratta Kappal", designation: "Professor of Practice", department: "Management" },
    ].map((member) => ({ ...member, affiliation: ATLAS })),
  },
  {
    id: "organizing-chair",
    title: "Organizing Chair",
    members: [{ name: "Dr. Varsha Agrawal", designation: "Director, Research", department: "Management", affiliation: ATLAS }],
  },
  {
    id: "advisory-board",
    title: "Advisory Board",
    members: [
      { name: "Deepak Mathur" },
      { name: "Dr. Takako Hashimoto" },
      { name: "Dr. Sameer S M", designation: "Professor", affiliation: "NIT Calicut" },
      { name: "Nirmal Nair" },
      { name: "Dr. Marina Tropmann-Frick", affiliation: "Hamburg University of Applied Sciences, Germany" },
      { name: "Dr. Vincenzo Piuri", affiliation: "Università degli Studi di Milano, Milano, Italy" },
      { name: "Dr. Mukesh D. Patil", designation: "Principal", affiliation: "Ramrao Adik Institute of Technology, Navi Mumbai" },
      { name: "Mr. BL Bishnoi", designation: "Head, Embedded Electronics R&D", affiliation: "Schneider Electric, Mumbai" },
    ],
  },
  {
    id: "technical-program-committee-chair",
    title: "Technical Program Committee Chair",
    statusNote: "To be announced.",
    members: [],
  },
  {
    id: "technical-program-committee",
    title: "Technical Program Committee",
    statusNote: "Being constituted — members will be announced.",
    members: [],
  },
  {
    id: "technical-review-committee",
    title: "Technical Review Committee",
    statusNote: "Being constituted — members will be announced.",
    members: [],
  },
];

export const committeeCategories = categories.map((category) => ({
  ...category,
  members: category.members.map((member) => ({ ...member, slug: slugify(member.name), category: category.id })),
}));

/** Every published member, each with `slug` and `category` (the category id). */
export const committeeMembers = committeeCategories.flatMap((category) => category.members);

// Slugs are URLs — fail the build rather than silently shadow a profile.
const seen = new Set();
for (const { slug, name } of committeeMembers) {
  if (!slug || seen.has(slug)) throw new Error(`Duplicate or empty committee slug "${slug}" for ${name}`);
  seen.add(slug);
}

export const getCategory = (id) => committeeCategories.find((category) => category.id === id);
export const getMember = (slug) => committeeMembers.find((member) => member.slug === slug);
export const memberHref = (member) => `/committee/${member.slug}`;

/* Homepage Committee section */

export const committeeNote =
  "The Technical Program Committee Chair, Technical Program Committee and Technical Review Committee will be announced.";

const chair = getCategory("organizing-chair").members[0];
export const organizingChair = {
  name: chair.name,
  role: "Organizing Chair",
  designation: chair.designation,
  institution: chair.affiliation,
};

export const organizingCommittee = getCategory("organizing-committee").members;
