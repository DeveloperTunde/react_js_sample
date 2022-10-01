const now = new Date()
let s1= "2015-3-14, 18:30";
let s2 = "2022, 0, 9, 17, 30, 0";
let e1 = "2022, 0, 9, 19, 0, 0";
export default [
  
  {
    id: 22,
    title: 'Cooking Class',
    start: new Date(s2),
    end: new Date(e1),
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(s1),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
]