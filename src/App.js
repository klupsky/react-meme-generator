import './App.css';
import axios from 'axios';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';

function App() {
  const [templates, setTemplates] = useState([]);
  const [dropdown, setDropdown] = useState('');
  const [toptext, setToptext] = useState('top text');
  const [bottomtext, setBottomtext] = useState('bottom text');
  const [image, setImage] = useState(
    'https://api.memegen.link/images/aag/hello/you.png',
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
      <form>
        <label>
          Meme template <br />
          <select
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

        <label>
          Enter top text here:
          <br />
          <input
            value={toptext}
            onChange={(event) => {
              setToptext(event.currentTarget.value);
            }}
          />
        </label>

        <br />
        <br />

        <label>
          Enter top text here:
          <br />
          <input
            value={bottomtext}
            onChange={(event) => {
              setBottomtext(event.currentTarget.value);
            }}
          />
        </label>

        <br />
        <br />
      </form>
      <br />
      {/* button generates al the set infos into the link to set image */}
      <button
        className="button"
        onClick={() => {
          setImage(
            `https://api.memegen.link/images/${dropdown}/${toptext}/${bottomtext}.png`,
          );
        }}
      >
        Generate
      </button>
      <br /> <br />
      <img data-test-id="meme-image" src={image} alt="" />
      <br />
      <br />
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
    </div>
  );
}

export default App;
