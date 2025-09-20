export class UserNotFoundError extends Error {
  readonly type = 'user-not-found-error';
}

export class OrganizationNotFoundError extends Error {
  readonly type = 'organization-not-found-error';
}

export class ProjectError extends Error {
  readonly type = 'project-error';
}

export class ResourceError extends Error {
  readonly type = 'resource-error';
}

export type CreateProjectError =
  | UserNotFoundError
  | OrganizationNotFoundError
  | ProjectError;

export type CreateResourceError =
  | UserNotFoundError
  | OrganizationNotFoundError
  | ProjectError
  | ResourceError;
