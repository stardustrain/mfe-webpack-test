import {lazy, Suspense} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

// @ts-ignore
const Me = lazy(() => import('me/Me'))

interface Props {
}

export default function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/me">마이페이지</Link>
          </li>
        </ul>
      </nav>
        <Suspense fallback="loading...">
          <Me />
        {/* <Switch> */}
            {/* <Route path="me" component={Me} /> */}
        {/* </Switch> */}
        </Suspense>
    </div>
  )
}
