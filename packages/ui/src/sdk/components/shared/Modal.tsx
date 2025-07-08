import { PropsWithChildren } from "react";

interface Props {

}

export function Modal({ children }: PropsWithChildren<Props>) {
  /**
   * Figma Here: https://www.figma.com/design/DOtEKrEM2NmDWJ40qJ3SjN/React-SDK?node-id=7-2892&t=T60V5ftzzKNsxN9N-4
   *
   * NOTES:
   * - Use tailwind. It is setup in the project.
   *
   * INVESTIGATE: How to create reuseable React component that can have its styles overridden.
   *
   * REQUIREMENTS:
   * - Should be able to define a screen position to display the modal.
   * - Should have a standard shadow per FIGMA design
   * - Should have a standard padding per FIGMA design
   * - Should have a standard border radius per FIGMA design
   *
   * STEPS:
   * 1. Create this component.
   * 2. Add a story in the "Stories" directory.
   * 3. Story should be visible when you run `yarn storybook`
   */
  return <div className=''>{children}</div>
}
