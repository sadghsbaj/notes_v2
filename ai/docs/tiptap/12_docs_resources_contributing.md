[Home](/docs)

Copy markdownAsk AI

# Contributing to Tiptap

Tiptap would be nothing without its lively community. Contributions have always been and will always be welcome. Here is a little bit you should know, before you send your contribution:

## [](#welcome-examples)Welcome examples

-   Failing regression tests as bug reports
-   Documentation improvements, e. g. fix a typo, add a section
-   New features for existing extensions, e. g. a new configureable option
-   Well explained, non-breaking changes to the core

## [](#wont-merge)Won’t merge

-   New extensions, which we then need to support and maintain

## [](#submit-ideas)Submit ideas

Make sure to open an issue and outline your idea first. We’ll get back to you quickly and let you know if there is a chance we can merge your contribution.

## [](#set-up-the-development-environment)Set up the development environment

It’s not too hard to tinker around with the official repository. You’ll need [Git](https://github.com/git-guides/install-git), [Node](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation) installed. Here is what you need to do then:

1.  Copy the code to your local machine: `$ git clone git@github.com:ueberdosis/tiptap.git`
2.  Install dependencies: `$ pnpm install`
3.  Start the development environment: `$ pnpm run start`
4.  Open [http://localhost:3000](http://localhost:3000) in your favorite browser.
5.  Start playing around!

## [](#our-code-style)Our code style

There is an eslint config that ensures a consistent code style. To check for errors, run `$ pnpm run lint`. That’ll be checked when you send a pull request, too. Make sure it’s passing, before sending a pull request.

## [](#test-for-errors)Test for errors

Your pull request will automatically execute all our existing tests. Make sure that they all pass, before sending a pull request. Run all tests locally with `$ pnpm run test` or run single tests (e. g. when writing new ones) with `$ pnpm run test:open`.

## [](#create-your-own-extensions)Create your own extensions

If you want to create and maintain your own extensions, you can use your `create-tiptap-extension` CLI tool. It will create a new extension boilerplate with all necessary files and the build process. It's as easy as running

```
pnpm init tiptap-extension
```

If you want to let us know about your extension you can give us a hint on [X](https://x.com/tiptap_editor) or [Discord](https://tiptap.dev/discord).

## [](#document-your-contributions)Document your contributions

When contributing to Tiptap, it's important to understand that Tiptap's codebase and its documentation are managed in two separate repositories. If you make changes or enhancements to Tiptap, documenting these changes is of course important for clarity and usability by others. Ensure you update the documentation repository corresponding to any alterations you make in the code.

1.  Tiptap Repository: [Tiptap Code Repository](https://github.com/ueberdosis/tiptap) - Modify the code here.
2.  Documentation Repository: [Tiptap Documentation Repository](https://github.com/ueberdosis/tiptap-docs) - Update or add documentation here to reflect changes made in the Tiptap repository.

In your PR to the Tiptap code repository, include a reference to the corresponding updates you've made in the Documentation repository. Alternatively, when submitting a PR to the Documentation repository, make sure to include references to any associated code changes in the Tiptap repository if they are relevant to the documentation updates.

## [](#further-questions)Further questions

Any further questions? Create a [new issue](https://github.com/ueberdosis/tiptap/issues) or [discussion](https://github.com/ueberdosis/tiptap/discussions) in the repository. We’ll get back to you.

[PreviouslyTiptap trial](/docs/resources/tiptap-trial)

[Next upEditor changelog](/docs/resources/changelog)
