// Dependencies
import React from "react";

// CSS/SASS
import "./sass/AboutPage.scss";
import { Container } from "react-bootstrap";

/**
 * Purpose: This is a file containing the about page of the ProjectWixs front-end. It documents
 * basic layout and functionality of the about page.
 */
function AboutPage() {
  return (
    <div>
      <Container>
        <div className="word-content">
          <h1>About Us</h1>
          <h2 id="purpose">
            <strong>What is Project Wix?</strong>
          </h2>
          <p>
            Launched in early 2020, Project Wixs is a Content Management System
            allowing for the seamless creation of single-page web pages
            featuring an easy-to-use drag and drop component interface. Project
            Wixs aims to provide an intuitive experience for a wide range of
            users; from complete beginners unfamiliar with any form of web
            design or HTML, to veteran designers with multiple years of
            experience. The system allows for up to 15 user accounts that can
            create and edit web pages with a range of content typical of any
            modern day website (such as stylized text and images). Users will be
            able to create, edit, and delete up to four templates and publish
            one at any time for live viewing.
          </p>

          <h2 id="purpose">
            <strong>What do we offer?</strong>
          </h2>
          <p>
            Each user account will be able to edit and create four user
            templates as well as host a private collection images. To customize
            these sites, Project Wixs features a drag-and-drop editor that will
            allow users to create web templates with little to no knowledge of
            HTML. This will include standard HTML components such as headers,
            text, links, etc. as well as the aforementioned media content that
            can all be organized and arranged in a visual interface. For more
            experienced users, an option to switch to a plaintext HTML editor
            will be included as well, to allow direct customization.
          </p>

          <h2 id="purpose">
            <strong>Skill levels</strong>
          </h2>
          <p>
            We cater to 2 different tiers of users for 2 different skill levels.
            Certain features of Project Wixs may or may not be relevant on the
            user’s skill level so they are restricted to prevent clutter and
            confusion. Overall, Project Wixs will favour Beginner users with
            limited to no HTML experience as the drag-and-drop functionality
            lends itself better to these low-level users, rather than high-level
            users who want greater freedom of customization.
          </p>
          <ul>
            <li>
              <strong>Beginner</strong>
            </li>
            <dl>
              Beginner users are those with little to no experience with HTML or
              web design. Project Wixs seeks to appeal to them by allowing them
              not to have to touch HTML code at all, and to work exclusively
              within the visual drag-and-drop editor.
            </dl>
            <li>
              <strong>Expert</strong>
            </li>
            <dl>
              Expert users have over ~5 years of experience with HTML/web
              design, and may not want to even bother with learning the
              drag-and-drop editor. This option allows the user to take
              advantage of the plain text editor. This element is built directly
              into the editor and allows for even deeper customization of the
              selected template
            </dl>
          </ul>

          <h2 id="team">
            <strong>The Project Wixs Team</strong>
          </h2>
          <ul>
            <li>
              <strong>Drayton Williams</strong> - GitHub Profile:{" "}
              <a
                href="https://github.com/DrayWilliams1"
                title="Visit DrayWilliams1's GitHub"
                target="_blank"
              >
                DrayWilliams1
              </a>
            </li>
            <li>
              <strong>Jasdeep Grewal</strong> - GitHub Profile:{" "}
              <a
                href="https://github.com/jdip34"
                title="Visit jdip34's GitHub"
                target="_blank"
              >
                jdip34
              </a>
            </li>
            <li>
              <strong>Cameron Hammel</strong> - GitHub Profile:{" "}
              <a
                href="https://github.com/camhammel"
                title="Visit camhammel's GitHub"
                target="_blank"
              >
                camhammel
              </a>
            </li>
            <li>
              <strong>Ian LeMasters</strong> - GitHub Profile:{" "}
              <a
                href="https://github.com/GitG0"
                title="Visit GitG0's GitHub"
                target="_blank"
              >
                GitG0
              </a>
            </li>
            <li>
              <strong>Curtis Honsberger</strong> - GitHub Profile:{" "}
              <a
                href="https://github.com/HawtPie"
                title="Visit HawtPie's GitHub"
                target="_blank"
              >
                HawtPie
              </a>
            </li>
            <li>
              <strong>Liam Howes</strong> - GitHub Profile:{" "}
              <a
                href="https://github.com/LiamHowes"
                title="Visit LiamHowes's GitHub"
                target="_blank"
              >
                LiamHowes
              </a>
            </li>
            <li>
              <strong>Kieran Colaco</strong> - GitHub Profile:{" "}
              <a
                href="https://github.com/sabonis123"
                title="Visit sabonis123's GitHub"
                target="_blank"
              >
                sabonis123
              </a>
            </li>
            <li>
              <strong>Nathan Hellinga</strong> - GitHub Profile:{" "}
              <a
                href="https://github.com/nathan-hellinga"
                title="Visit nathan-hellinga's GitHub"
                target="_blank"
              >
                nathan-hellinga
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;
