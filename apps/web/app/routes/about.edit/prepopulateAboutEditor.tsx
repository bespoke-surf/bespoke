import { $createLinkNode } from "@lexical/link";
import { $createHeadingNode } from "@lexical/rich-text";
import type { RootNode } from "lexical";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { $createSubscribeButtonNode } from "../../components/editor/nodes/SubscribeButtonNode";

const space = (root: RootNode) => {
  const space = $createParagraphNode();
  root.append(space);
};

export function prepopulatedAboutEditor() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode("h1");
    heading.append($createTextNode("Why Subscribe?"));
    root.append(heading);

    space(root);

    if (typeof window !== "undefined") {
      const paragraph = $createParagraphNode();
      paragraph.append(
        $createTextNode("Subscribe to get full access to the newsletter and "),
        $createLinkNode(`${window.location.origin}`).append(
          $createTextNode("website")
        ),
        $createTextNode(". Never miss an update.")
      );
      root.append(paragraph);

      const subscribe = $createSubscribeButtonNode({
        href: `${window.location.origin}/subscribe`,
      });
      root.append(subscribe);
    }

    space(root);
    const subheading1 = $createHeadingNode("h2");
    subheading1.append($createTextNode("Stay up-to-date"));
    root.append(subheading1);

    const paragraph2 = $createParagraphNode();
    paragraph2.append(
      $createTextNode(
        "You won’t have to worry about missing anything. Every new edition of the newsletter goes directly to your inbox."
      )
    );
    root.append(paragraph2);

    space(root);
    const subheading2 = $createHeadingNode("h2");
    subheading2.append($createTextNode("Join the crew"));
    root.append(subheading2);

    const paragraph3 = $createParagraphNode();
    paragraph3.append(
      $createTextNode(
        `Be part of a community of people who share your interests.`
      )
    );
    root.append(paragraph3);

    space(root);
    const paragraph4 = $createParagraphNode();
    paragraph4.append(
      $createTextNode(
        `To find out more about the company that provides the tech for this newsletter, visit `
      ),
      $createLinkNode("https://bespoke.surf").append(
        $createTextNode("Bespoke.surf")
      ),
      $createTextNode(".")
    );
    root.append(paragraph4);
  }
}
