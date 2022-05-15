import './App.css';
import axios from 'axios';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';

function App() {
  const [templates, setTemplates] = useState([]);
  const [dropdown, setDropdown] = useState('');
  const [toptext, setToptext] = useState('');
  const [bottomtext, setBottomtext] = useState('');
  // const [typein, setTypein] = useState('');
  const [image, setImage] = useState(
    `https://api.memegen.link/images/${dropdown}/${toptext}/${bottomtext}.png`,
  );

  // from filesaver package
  const saveFile = () => {
    FileSaver.saveAs(image, 'meme.png');
  };

  // promise that fetches images from api.memegen.link and if resolved sets them into template array?

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('https://api.memegen.link/templates');
        setTemplates(result.data);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    })().catch((error) => {
      console.log(error);
    });
  }, []);

  // console.log(templates);

  return (
    <div>
      <form name="meme">
        <h1>Make your meme!</h1>
        <label>
          Meme template <br />
          <select
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                setImage(
                  `https://api.memegen.link/images/${dropdown}/${toptext}/${bottomtext}.png`,
                );
              }
            }}
            onChange={(event) => {
              setDropdown(event.currentTarget.value);
            }}
          >
            {/* make a map that loops through array to filer out the key and value of template.id to put the available image-ids into the options of the select input */}
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        {/* input typein
        <label>
          Optional
          <br />
          <input
            placeholder="type in meme name"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                setImage(
                  `https://api.memegen.link/images/${typein}/${toptext}/${bottomtext}.png`,
                );
              }
            }}
            value={typein}
            onChange={(event) => {
              setTypein(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />*/}
        {/* input top text */}
        <label>
          Top text
          <br />
          <input
            placeholder="type in top text"
            value={toptext}
            onChange={(event) => {
              setToptext(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />
        {/* input bottom text */}
        <label>
          Bottom text
          <br />
          <input
            placeholder="type in bottom text"
            value={bottomtext}
            onChange={(event) => {
              setBottomtext(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <br />
        {/* clear button */}
        <button className="button" onClick="resetForm()">
          Reset
        </button>{' '}
      </form>

      {/* button generates meme onclick
      either with a typed in imagename if there is one
      or with a dropbdown imagename */}

      <button
        className="button"
        onClick={() => {
          setImage(
            `https://api.memegen.link/images/${dropdown}/${toptext}/${bottomtext}.png`,
          );
        }}
      >
        Generate Meme
      </button>

      {/* download button */}

      <button
        className="button"
        onClick={() => {
          console.log(image);
          setImage(image);
          saveFile();
        }}
      >
        {' '}
        Download
      </button>

      <br />
      <br />

      {/* image preview */}

      <img
        data-test-id="meme-image"
        src={`https://api.memegen.link/images/${dropdown ? dropdown : 'aag'}/${
          toptext ? toptext : '_'
        }/${bottomtext ? bottomtext : ''}.png`}
        alt="memeimage"
      />
    </div>
  );
}

export default App;
