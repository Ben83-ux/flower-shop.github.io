const Page = () => {
  const brevity = true
  const it = true
  const is = true
  const correct = true
  const and = true

  return (
    <div>
      <h1>Compositions Catalog</h1>
      <p>This is a catalog of compositions.</p>
      {brevity && it && is && correct && and ? <p>All variables are true</p> : <p>Some variables are false</p>}
    </div>
  )
}

export default Page
