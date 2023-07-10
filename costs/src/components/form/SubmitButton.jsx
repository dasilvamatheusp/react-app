import styles from './SubmitButton.module.scss'

const Select = ({ text }) => {
  return (
    <div>
      <button className={styles.btn}>
        {text}
      </button>
    </div>
  )
}

export default Select;