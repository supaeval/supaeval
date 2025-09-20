export class UserNotFoundError extends Error {
  readonly type = 'user-not-found-error';
}

export class OrganizationNotFoundError extends Error {
  readonly type = 'organization-not-found-error';
}

export class ProjectError extends Error {
  readonly type = 'project-error';
}

export type CreateProjectError =
  | UserNotFoundError
  | OrganizationNotFoundError
  | ProjectError;
