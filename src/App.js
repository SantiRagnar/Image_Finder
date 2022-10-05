import { Formik, Form, Field } from 'formik';
import { useState } from 'react'
import './header.css';
import './content.css';
import './article.css';

function App() {
  const [photos, setPhotos] = useState([])
  console.log(photos)
  const open = url =>{window.open(url)}

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values =>{
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
              headers: {
                'Authorization': 'Client-ID Yi_lgb0fGyJb2joGIIfd-pFfr_hrg215PKPvuGWJXus'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(ph=>
            <article key={ph.id} onClick={() => open(ph.links.html)}>
              <img src={ph.urls.regular}/>
              <p>{[ph.description, ph.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
