import { useState } from "react";
import "./App.css";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id)); 
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [selectedId, setSelectedId] = useState(null);

  const topics = [
    { id: 1, title: "HTML", body: "HTML is..." },
    { id: 2, title: "CSS", body: "CSS is..." },
    { id: 3, title: "JavaScript", body: "JavaScript is..." }
  ];

  let content = null;

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Webs"></Article>;
  } else if (mode === "READ") {
    const selectedTopic = topics.find((topic) => topic.id === selectedId);
    if (selectedTopic) {
      content = (
        <Article title={selectedTopic.title} body={selectedTopic.body}></Article>
      );
    }
  }

  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME"); 
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("READ");
          setSelectedId(id); 
        }}
      />
      {content}
    </div>
  );
}

export default App;
