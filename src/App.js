import './App.css';
import { useEffect } from 'react';
import {v1 as uuid} from "uuid"; 
import translate from 'translate'

function App() {

  useEffect(() => {
    const keyValue = [];
    const element = document.getElementsByClassName('mostOuterDiv')[0].childNodes;
    async function languageCaller(){
      async function languageTranslator (element) {
        for (let i = 0; i < element.length; i++) { 
          const uniqueKey = uuid();
          if (element[i].nodeType !== 3) {
            languageTranslator(element[i].childNodes)
          }else{
            element[i].parentNode.classList.add(uniqueKey);
            keyValue.push({
              'key': uniqueKey,
              'nodeValue' :element[i].parentNode.textContent
            });
          }
        }
      }
      await languageTranslator(element);
      return keyValue;
    }
    languageCaller()
      .then(async (data) => {
        async function finallyConverting() {
          data.forEach(async (item) => {
            const translated = await translate(item.nodeValue, 'es')
            const element = document.getElementsByClassName(item.key)[0]
            element.textContent = translated
          })
        }
        finallyConverting()
      })
  }, [])
  return (
    <span className="mostOuterDiv">
      <div className="outerDiv">
        <div className="innerDiv">
          <p className="para">paragraph about you </p>
          <ul className="ulTag">
            <li>
              inner
            </li>
            <li>
              about
            </li>
          </ul>
        </div>
        <div>
          <div>
            <p>special character</p>
          </div>
        </div>
      </div>
      <span>
        <h1>Hello</h1>
        <p>para</p>
        <span>
          <h1>after Para</h1>
          <a href="/">link</a>
        </span>
        <span>
          <p>
            inner <span> hello</span>
          </p>
        </span>
        <ul>
          <li>
            text
          </li>
          <li>
            text
          </li>
        </ul>
      </span>
    </span>
  );
}

export default App;
