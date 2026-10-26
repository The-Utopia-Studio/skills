// Locator helpers handed to every flow. `action` matches a link or button whose accessible name
// starts with the text, so "Open" doesn't also match the sidebar's "Open menu".
export const see = (page, text, timeout = 30_000) => page.getByText(text, { exact: false }).first().waitFor({ timeout });
export const button = (page, name, exact = false) => page.getByRole("button", { name, exact }).first();
export const link = (page, name, exact = false) => page.getByRole("link", { name, exact }).first();
export const action = (page, name) => {
  const re = new RegExp("^" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(\\s*$|\\s*\\()");
  return page.getByRole("link", { name: re }).or(page.getByRole("button", { name: re })).first();
};
