// Worked example: the UtopiaOS fellow onboarding tour, consent to home, ~6 minutes, 30 scenes.
// It only runs inside a UtopiaOS demo copy (see README.md here); for another app, start from flows/template.mjs.
// Every value typed below is fake on purpose: the video is shown to people outside the team.
//   WEB_DIR=<demo worktree>/apps/web SAMPLES=<dir from make-samples.mjs> node <skill>/scripts/record.mjs flow.mjs
import { execFileSync } from "node:child_process";
import { join } from "node:path";

export default ({ config, env, see, button, link, action }) => {
  const BASE = config.baseUrl.replace(/\/$/, "");
  const SAMPLES = env.SAMPLES;
  // A scene can change backend state mid-take, e.g. to stand in for something the person does in another app.
  const convexRun = (fn, args = "{}") => execFileSync("npx", ["convex", "run", fn, args], { cwd: env.WEB_DIR ?? config.appDir, stdio: "pipe" });
  const sectionNext = (page) => page.getByRole("button", { name: "Next", exact: true }).last();
  const DHOW = "/assets/home/doha-dhow-sailing-pencil-alpha.webm"; // looping clip already served by the app

  const scenes = [
    {
      say: "Welcome to Utopia. This short walkthrough takes you through every step of your onboarding, from your very first sign in, all the way to your home.",
      act: async (h) => { await h.sleep(6200); await h.uncard(); },
    },
    {
      say: "The first time you sign in, you'll be asked to accept four short agreements: the terms of service, the privacy policy, consent to AI processing, and confirmation that you're over eighteen.",
      act: async (h) => { await h.sleep(1500); await h.scrollBy(260, { duration: 3200 }); },
    },
    {
      say: "Read each one, tick all four, then select Agree and continue.",
      act: async (h) => {
        const boxes = h.page.locator('button[role="checkbox"]');
        for (let i = 0; i < 4; i++) await h.click(boxes.nth(i), { pause: 120 });
        await h.click(button(h.page, "Agree and continue"));
        await see(h.page, "settled in");
      },
    },
    {
      say: "This is your home. Until onboarding is finished, it shows where you are, and points you to your welcome steps.",
      act: async (h) => { await h.sleep(1200); await h.scrollBy(520, { duration: 3000 }); await h.sleep(900); await h.scrollTop({ duration: 1800 }); await h.hover(button(h.page, "Complete your welcome steps").or(link(h.page, "Complete your welcome steps")).first()); },
    },
    {
      say: "Onboarding has four parts: Welcome, Your workspace, Your interests, and Using the OS. It starts with a short welcome film from the studio.",
      act: async (h) => {
        await h.click(link(h.page, "Complete your welcome steps"));
        await see(h.page, "build something that matters");
        await h.sleep(800);
        await h.hover(h.page.locator("video").first());
      },
    },
    {
      say: "If you ever get stuck, the Onboarding guide and FAQ is always at the top of the page. When you're ready, select Next.",
      act: async (h) => {
        await h.hover(button(h.page, "Onboarding guide"));
        await h.sleep(1600);
        await h.click(h.page.locator("footer").getByRole("button", { name: /Next/ }));
        await see(h.page, "Join the Slack workspace");
      },
    },
    {
      say: "Your workspace setup has six steps. First, join the studio Slack using your invitation. Every step also has a short how to video, in case you need a hand.",
      act: async (h) => {
        await h.sleep(600);
        await h.hover(link(h.page, "Join the Slack workspace"));
        await h.sleep(1800);
        await h.hover(h.page.getByText("How to join the studio Slack").first());
      },
    },
    {
      say: "Once you've joined, come back to this page. We check your Slack connection automatically, and move you on to the next step.",
      act: async (h) => { await h.sleep(2200); convexRun("demoSeed:slackJoined") /* stands in for joining Slack */; await see(h.page, "Fellow onboarding form"); },
    },
    {
      say: "Next is the fellow onboarding form. It has six short sections, and your answers save as you go, so you can come back to it any time.",
      act: async (h) => { await h.sleep(1500); await h.click(action(h.page, "Open")); await see(h.page, "Personal details"); },
    },
    {
      say: "Start with your personal details. Use your name exactly as it appears on your passport.",
      act: async (h) => {
        const p = h.page;
        await h.type(p.locator("#fellow-startup"), "Northwind Health");
        await h.type(p.locator("#fellow-given"), "Jordan");
        await h.type(p.locator("#fellow-last"), "Sample");
        await h.fill(p.locator("#fellow-dob"), "1994-03-12");
        await h.select(p.locator("#fellow-gender"), "Female");
        await h.select(p.locator("#fellow-nationality"), "Canada");
        await h.select(p.locator("#fellow-birthplace-country"), "Canada");
        await h.type(p.locator("#fellow-birthplace-city"), "Toronto");
      },
    },
    {
      say: "Then add your home address, your email, and your mobile number, and select Next.",
      act: async (h) => {
        const p = h.page;
        await h.select(p.locator("#fellow-residence-country"), "Qatar");
        await h.type(p.locator("#fellow-address"), "1 Example Street, Doha");
        await h.type(p.locator("#fellow-email"), "jordan@example.com");
        await h.select(p.getByLabel("Mobile phone number country code"), "Qatar (+974)");
        await h.type(p.locator("#fellow-phone"), "5555 0100");
        await h.click(sectionNext(p));
        await see(p, "photo-bearing ID");
      },
    },
    {
      say: "Section two is your ID. Choose the type, add the number, the issuing country and the expiry date. Then upload a clear copy straight from your computer. It goes to your private studio folder.",
      act: async (h) => {
        const p = h.page;
        await h.scrollTop({ duration: 900 });
        await h.click(p.getByRole("radio", { name: "Passport" }));
        await h.type(p.locator("#fellow-id-number"), "X0000000");
        await h.select(p.locator("#fellow-id-issuer"), "Canada");
        await h.fill(p.locator("#fellow-id-expiry"), "2031-08-20");
        await h.upload(p.locator('input[type="file"]').first(), join(SAMPLES, "sample-passport.jpg"));
        await see(p, "sample-passport.jpg");
        await h.reveal(p.getByText("sample-passport.jpg").first());
        await h.sleep(1200);
        await h.click(sectionNext(p));
        await see(p, "Bank details");
      },
    },
    {
      say: "Section three is where your stipend is paid. Enter the account name exactly as your bank holds it, with your account number, IBAN, and your SWIFT and BIC codes. If you only have one of the two, put NA in the other.",
      act: async (h) => {
        const p = h.page;
        await h.scrollTop({ duration: 900 });
        await h.type(p.locator("#fellow-account-name"), "Jordan Sample");
        await h.select(p.locator("#fellow-bank-country"), "Qatar");
        await h.type(p.locator("#fellow-account-number"), "0000000000", { delay: 30 });
        await h.type(p.locator("#fellow-iban"), "QA00EXAM000000000000000000000", { delay: 26 });
        await h.type(p.locator("#fellow-swift"), "EXAMQAQA");
        await h.type(p.locator("#fellow-bic"), "NA");
        await h.type(p.locator("#fellow-bank-name"), "Example Bank");
        await h.type(p.locator("#fellow-bank-address"), "2 Example Avenue, Doha, Qatar", { delay: 28 });
      },
    },
    {
      say: "Then upload a confirmation letter on your bank's letterhead. Bank statements aren't accepted.",
      act: async (h) => {
        const p = h.page;
        await h.upload(p.locator('input[type="file"]').first(), join(SAMPLES, "sample-bank-letter.jpg"));
        await see(p, "sample-bank-letter.jpg");
        await h.reveal(p.getByText("sample-bank-letter.jpg").first());
        await h.sleep(1000);
        await h.click(sectionNext(p));
        await see(p, "Who the studio calls");
      },
    },
    {
      say: "Section four is an emergency contact: someone the studio can call if anything happens.",
      act: async (h) => {
        const p = h.page;
        await h.scrollTop({ duration: 900 });
        await h.type(p.locator("#fellow-emergency-name"), "Riley Sample");
        await h.select(p.getByLabel("Emergency contact mobile number country code"), "Canada (+1)");
        await h.type(p.locator("#fellow-emergency-mobile"), "416 555 0100");
        await h.type(p.locator("#fellow-emergency-email"), "riley@example.com", { delay: 28 });
        await h.type(p.locator("#fellow-emergency-relation"), "Brother");
        await h.click(sectionNext(p));
        await see(p, "Coming to Doha?");
      },
    },
    {
      say: "In section five, tell us whether you're coming to Doha in person, and your preferred start date from your participation agreement.",
      act: async (h) => {
        const p = h.page;
        await h.scrollTop({ duration: 900 });
        await h.reveal(p.getByText("Coming to Doha?").first(), { block: "start" });
        await h.sleep(1500);
        await h.click(p.getByRole("radio", { name: "Yes" }).first());
        await h.fill(p.locator("#fellow-start-date"), "2026-11-15");
        await h.click(sectionNext(p));
        await see(p, "Consent & declaration");
      },
    },
    {
      say: "Finally, read the declaration, confirm, and send your details to the studio.",
      act: async (h) => {
        const p = h.page;
        await h.scrollTop({ duration: 900 });
        await h.scrollBy(380, { duration: 3200 });
        await h.click(p.getByRole("radio", { name: "Yes" }).first());
        await h.click(button(p, "Send my details to the studio"));
        await see(p, "Upload your domain material", 60_000);
      },
    },
    {
      say: "Your details are with the studio. Next, share your domain material: the decks, research, and notes that show how your field works.",
      act: async (h) => { await h.sleep(1800); await h.click(action(h.page, "Open Drive folder")); await see(h.page, "Your Google Drive folder"); },
    },
    {
      say: "Open your own Drive folder, upload your files, and then submit your domain material.",
      act: async (h) => {
        const p = h.page;
        await h.scrollBy(260, { duration: 2400 });
        await h.click(action(p, "Open my Drive folder"));
        await h.sleep(1800);
        await h.click(button(p, "Submit domain material"));
        await see(p, "Marketing form");
      },
    },
    {
      say: "The marketing form helps the studio announce you to the cohort.",
      act: async (h) => { await h.sleep(800); await h.click(action(h.page, "Open form")); await see(h.page, "Headshot"); },
    },
    {
      say: "Upload your own headshot, or request a studio session. Then add a one line description of your venture, and a short bio.",
      act: async (h) => {
        const p = h.page;
        await h.click(p.locator('button[value="studio"]'));
        await h.type(p.locator("#marketing-venture-line"), "Northwind Health helps clinics predict no-shows and fill empty appointment slots.", { delay: 22 });
        await h.type(p.locator("#marketing-bio"), "Jordan Sample is the founder of Northwind Health, which helps clinics keep their schedules full. Before founding it, Jordan spent eight years in hospital operations.", { delay: 16 });
        await h.click(button(p, "Submit marketing details"));
        await see(p, "Travel request for Doha");
      },
    },
    {
      say: "Travel to Doha is optional, so you can skip it if you're not coming. If you are, open the travel request.",
      act: async (h) => { await h.sleep(1200); await h.click(action(h.page, "Open form")); await see(h.page, "What is your citizenship?"); },
    },
    {
      say: "Share your citizenship, where you're flying from, whether you need a visa, and your dates. The studio books your travel once it's approved, so please don't book anything yourself before then.",
      act: async (h) => {
        const p = h.page;
        await h.fill(p.locator("#travel-start"), "2026-11-15");
        await h.select(p.locator("#travel-citizenship"), "Canada");
        await h.select(p.locator("#travel-from-country"), "Canada");
        await h.select(p.locator("#travel-from-city"), "Toronto");
        const groups = p.getByRole("radiogroup");
        await h.click(groups.nth(0).getByRole("radio", { name: "Yes" }));
        await h.click(groups.nth(1).getByRole("radio", { name: "No", exact: true }));
        await h.click(groups.nth(2).getByRole("radio", { name: /exact dates/ }));
        await h.fill(p.locator("#travel-arrival"), "2026-11-14");
        await h.fill(p.locator("#travel-departure"), "2026-12-12");
      },
    },
    {
      say: "Confirm the declaration, and submit your travel details.",
      act: async (h) => {
        const p = h.page;
        await h.reveal(p.getByRole("radiogroup").last());
        await h.click(p.getByRole("radiogroup").last().getByRole("radio", { name: "Yes" }));
        await h.click(button(p, "Submit travel details"));
        await see(p, "Tech onboarding");
      },
    },
    {
      say: "The last setup step is tech onboarding.",
      act: async (h) => { await h.sleep(700); await h.click(action(h.page, "Start setup")); await see(h.page, "Your setup links"); },
    },
    {
      say: "Add the GitHub repository you're building in, and your Linear project if you have one. Then book the forty five minute guided session on Calendly. Bring your laptop. You don't need to be technical, and anything missing gets installed with you.",
      act: async (h) => {
        const p = h.page;
        await h.type(p.locator("#tech-github"), "https://github.com/example-org/example-app", { delay: 22 });
        await h.type(p.locator("#tech-linear"), "https://linear.app/example-org", { delay: 22 });
        await h.hover(p.getByText("Book on Calendly").first());
        await h.sleep(1200);
        await h.scrollBy(320, { duration: 2600 });
        await h.click(button(p, "Save links and continue"));
        await see(p, "This step is complete");
      },
    },
    {
      say: "And that's your workspace set up. All six steps are complete.",
      act: async (h) => { await h.sleep(1500); await h.click(h.page.locator("footer").getByRole("button", { name: /Continue to interests/ })); await see(h.page, "What would you like to explore?"); },
    },
    {
      say: "Now choose the areas you'd like to explore. AI Native is already ticked for you. The studio will review your choices with you, to shape your plan.",
      act: async (h) => {
        const p = h.page;
        await h.sleep(900);
        await h.click(p.locator("#interest-product"));
        await h.click(p.locator("#interest-go-to-market"));
        await h.scrollBy(700, { duration: 3200, within: "[data-onboarding-scroll]" });
        await h.sleep(800);
        await h.click(p.locator("footer").getByRole("button", { name: /Next/ }));
        await see(p, "How to use UtopiaOS");
      },
    },
    {
      say: "Before you head in, take a quick tour of your modules, skills and agents, and how to work with the studio. Then select Go to your home.",
      act: async (h) => {
        const p = h.page;
        const video = p.locator("video").first();
        await h.hover(video);
        await video.evaluate((v) => { v.muted = true; v.play(); });
        await h.sleep(5200);
        await video.evaluate((v) => v.pause());
        await h.click(action(p, "Go to your home"));
        await see(p, "Welcome back");
      },
    },
    {
      say: "And you're in. Your home shows your onboarding is complete. Your studio resources live here: your Drive folder, travel, setup links, and stipends. Below are your modules, and the library.",
      act: async (h) => { await h.sleep(1600); await h.scrollBy(1100, { duration: 7000 }); await h.sleep(1200); },
    },
    {
      say: "If you have a question at any point, the Onboarding guide and FAQ is always one click away.",
      act: async (h) => { await h.scrollTop({ duration: 2200 }); await h.hover(h.page.getByText("Onboarding guide").first()); await h.sleep(800); },
    },
    {
      say: "Welcome to Utopia. We can't wait to see what you build.",
      act: async (h) => { await h.card({ eyebrow: "Utopia Studio", title: "Welcome to Utopia", subtitle: "Questions? Open the Onboarding guide & FAQ from your home, or message the studio.", media: DHOW }); await h.sleep(2500); },
      gap: 2200,
    },
  ];

  return {
    zoom: 1, // 1 = the screen exactly as a fellow sees it; 1.3 eases in on each field
    scenes,
    prepare: async (h) => {
      const p = h.page;
      await p.goto(`${BASE}/fellow`);
      await see(p, "Review and accept", 60_000);
      const necessary = p.getByText("Necessary only").first(); // cookie banner: least tracking
      if (await necessary.isVisible().catch(() => false)) await necessary.click();
      await p.mouse.move(1220, 700);
      await h.card({ eyebrow: "Fellow onboarding", title: "Your first steps with Utopia", subtitle: "From your first sign in to your home: every step, in about five minutes.", media: DHOW });
      await h.sleep(1200);
    },
  };
};
