import loader from '/assets/icons/loader.svg'

const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
        <img src={loader} alt="loader" width={24} height={24} />
    </div>
  )
}

export default Loader