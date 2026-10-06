/**
 * Committees — published fields ONLY (name, designation, department).
 * Never add phone numbers, personal emails or IEEE member IDs here.
 *
 * Source: Conference_Committee_Tracker.xlsx
 *   - "Organizing Chair" tab   → Dr Varsha Agrawal
 *   - "Organizing Committee"   → 21 rows, status "Finalized" on the Summary tab
 *
 * ⚠ Pending organizer confirmation (see project notes):
 *   - The MOU draft lists only 9 core members and leaves the General Chair's name blank
 *     (affiliation "Director, UGDx School of Technology"). The tracker is used here because
 *     it is the newer, committee-specific document marked "Finalized".
 *   - Spellings follow the tracker. Other documents differ:
 *       Kunal Mehar   → "Kunal Meher" in his email signature
 *       Sarika Chouhan → "Sarika Chauhan" (MOU), "Sarika Shekhawat" (email)
 *       Varsha Agrawal → "Varsha Agarwal" (email display name)
 *   - Tracker department shorthand "Tech" is shown as "Technology".
 */

export const committeeNote =
  "The Advisory Board, Technical Program Committee and Technical Review Committee are being constituted and will be announced.";

export const organizingChair = {
  name: "Dr. Varsha Agrawal",
  role: "Organizing Chair",
  designation: "Director, Research",
  institution: "ATLAS SkillTech University",
};

/** department: "Technology" | "Management" | "Design" — drives the filter chips. */
export const organizingCommittee = [
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
];

/**
 * Future committees — add `members` arrays when finalized. Groups with no members
 * are not rendered. Advisory Board names exist in the tracker but are incomplete
 * (missing affiliations, consent unconfirmed), so they stay unpublished for now.
 */
export const futureCommittees = [
  { id: "advisory", title: "International / National Advisory Board", members: [] },
  { id: "tpc", title: "Technical Program Committee", members: [] },
  { id: "trc", title: "Technical Review Committee", members: [] },
];
