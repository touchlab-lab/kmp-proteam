export async function registerbuild(milliseconds: number): Promise<string> {
  return new Promise(resolve => {
    if (isNaN(milliseconds)) {
      throw new Error('milliseconds not a number')
    }
    console.log("in register build")
    setTimeout(() => resolve('done!'), milliseconds)
  })
}
