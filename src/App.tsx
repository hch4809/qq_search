import React, {useState} from 'react';
import styles from './app.module.less';

function App() {
  const [search, setSearch] = useState<string>('search');
  return (
    <div className={styles.box}>{search}</div>
  );
}

export default App;
