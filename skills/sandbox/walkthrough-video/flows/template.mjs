// A starting flow: copy it into the app's repo (e.g. walkthroughs/signup.mjs), rename, and rewrite the scenes.
// Record:  node <skill>/scripts/record.mjs walkthroughs/signup.mjs     (DRY=1 first)
//
// The default export gets { config, env, see, button, link, action } and returns { scenes, prepare? }.
// A scene is { say, act, gap? }: it lasts as long as the longer of its narration and its actions.
export default ({ config, see, button, action }) => {
  const base = config.baseUrl.replace(/\/$/, "");
  const brand = config.brand.name ?? "the app";
  return {
    // Runs before capture starts: get the page to the first frame, then raise the opening card over it.
    prepare: async (h) => {
      await h.page.goto(base + config.startPath);
      await see(h.page, "Dashboard", 60_000); // something that only shows once the page is ready
      await h.page.mouse.move(1220, 700);
      await h.card({ eyebrow: brand, title: "Create your first project", subtitle: "Every step, in about a minute." });
    },
    scenes: [
      {
        say: `This short video shows you how to create your first project in ${brand}.`,
        act: async (h) => { await h.sleep(3500); await h.uncard(); },
      },
      {
        say: "Start from your dashboard, and select New project.",
        act: async (h) => {
          await h.hover(button(h.page, "New project"));
          await h.sleep(600);
          await h.click(button(h.page, "New project"));
          await see(h.page, "Project name");
        },
      },
      {
        say: "Give it a name you'll recognise, then select Create.",
        act: async (h) => {
          await h.type(h.page.getByLabel("Project name"), "Northwind launch");
          await h.click(action(h.page, "Create"));
          await see(h.page, "Northwind launch");
        },
      },
      {
        say: "That's it. Your project is ready.",
        act: async (h) => { await h.card({ eyebrow: brand, title: "You're all set", subtitle: "Questions? Open Help from any page." }); await h.sleep(2000); },
        gap: 1800,
      },
    ],
  };
};
