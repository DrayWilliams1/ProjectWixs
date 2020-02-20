// Dependencies
import React from "react";

// Components
import NavBar from "./NavBar";

// CSS/SASS
import "./sass/AboutPage.scss";
import { Container } from "react-bootstrap";

/**
 * Purpose: This is a file containing the about page of the ProjectWixs front-end. It documents basic layout and functionality of the about page.
 */
function AboutPage() {
  return (
    <div>
      <NavBar />
      <Container>
        <div className="word-content">
          <h1>About Us</h1>
          <h3>Project Purpose</h3>
          <p>
            ProjectWixs is a Content Management System allowing for a seamless
            creation of single-page web pages featuring an easy-to-use drag and
            drop component interface. ProjectWixs aims to provide an intuitive
            experience for a wide range of users; from complete beginners
            unfamiliar with any form of web design or HTML, to veteran designers
            with multiple years of experience. The system will be able to have
            up to ten user accounts that can create and edit web pages with a
            range of content typical of any modern day website (such as text,
            images, and video). Users will be able to create, edit, and delete
            up to four templates and publish one at any time for live viewing.
          </p>

          <h3>The ProjectWixs Team</h3>
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
