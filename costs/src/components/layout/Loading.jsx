
import loading from '../../img/loading.svg';

import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loader_container}>
      <img className={styles.loading_icon} src={loading} alt="Loading" />
    </div>
  )
}

export default Loading;