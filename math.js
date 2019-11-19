export default class Math2
{
  static random(min,max)
  {
    return Math.floor(Math.random() * (max+1 - min) + min);
  }
}