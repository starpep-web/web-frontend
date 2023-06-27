import teamMembersJson from './teamMembers.json';

export type TeamMemberRole = 'Project Leaders' | 'Collaborators' | 'Developers' | string;

export interface TeamMember {
  name: string
  role: TeamMemberRole
  email: string
  shortCv: string[]
  avatarUrl: string
  website: string | null
  phone: string | null
  occupation: string | null
  affiliations: string[]
  location: string
}

export const teamMembers: TeamMember[] = teamMembersJson;

export const teamMembersByRole: Record<TeamMemberRole, TeamMember[]> = teamMembers.reduce((obj, member) => {
  if (obj[member.role]) {
    obj[member.role].push(member);
  } else {
    obj[member.role] = [member];
  }

  return obj;
}, {} as Record<TeamMemberRole, TeamMember[]>);
