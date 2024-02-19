import {IBall, IUniform, TBallColor} from './fields'

const ball:IBall = {
  color: 'red',
  buyId: 40
}

const playerUniform:IUniform = {
    id: 30,
    color: 'blue',
    club: 'Arsenal'
 }
 const fieldColor: TBallColor = "green"

console.log(`Welcome to London; our field is ${fieldColor}, player uniforms are ${playerUniform.color}, and balls are ${ball.color}.` )