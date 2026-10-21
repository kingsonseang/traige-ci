import { db } from '../data/db';
import type { Member, Project } from '../domain/types';

export const projectService = {
  getProjects(): Project[] {
    return db.projects;
  },

  getActiveProjects(): Project[] {
    return db.projects.filter((project) => project.status === 'active');
  },

  getProject(projectId: string): Project | undefined {
    return db.projects.find((project) => project.id === projectId);
  },

  getMembers(): Member[] {
    return db.members;
  },

  getMember(memberId: string | null): Member | undefined {
    if (memberId === null) return undefined;
    return db.members.find((member) => member.id === memberId);
  },
};
