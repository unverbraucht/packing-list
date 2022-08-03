import { ForbiddenException } from "@nestjs/common";
import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";
import { Role } from "../auth/role";

export const checkOwnEmailMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info } = ctx;
  const { extensions } = info.parentType.getFields()[info.fieldName];

  const user = ctx.context.req.user;

  if (!user) {
    // User is not logged in, cannot look at this field
    throw new ForbiddenException(
      `User does not have sufficient permissions to access "${info.fieldName}" field.`,
    );
  }

  const value = await next();

  const isAdmin = user.roles.indexOf(Role.ADMIN) !== -1;
  if (!isAdmin && value !== user.email) {
    // or just "return null" to ignore
    throw new ForbiddenException(
      `User does not have sufficient permissions to access "${info.fieldName}" field.`,
    );
  }
  return value;
};