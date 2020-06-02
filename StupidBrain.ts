import Brain from './Brain';

const stupid : Brain = {
  name: "Agop",
  step: state => {
    return {
      type: 'idle',
    }
  }
}

export default stupid;