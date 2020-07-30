# **Video Rental Store**

Select desired movies. Pay the amount and enjoy the movies. Movies are categorized into New, Regular and Old movies. You can also purchase through bonus points.

> [ツ Website](http://rentmoviesapp.herokuapp.com/)
>
> ![video rental store](./vrs.gif)

---

## **Pricing**

- Premium fee ⇒ 40&euro;
- Regular fee ⇒ 30&euro;

* ### Price Calculation

  | Film Type | Amount                                                                   |
  | --------- | ------------------------------------------------------------------------ |
  | New       | Premium fee **x** no. of days                                            |
  | Regular   | Regular Fee for first 3 days **+** Regular fee **x** no. of days over 3. |
  | Old       | Regular Fee for first 5 days **+** Regular fee **x** no. of days over 3. |

---

## **Bonus Points**

- New Release ⇒ 2 points
- Old & Regular ⇒ 1 point

> **25 points pays the rental for one day.**

---

## **Scripts**

|                      | [yarn](https://yarnpkg.com/) | [npm](https://www.npmjs.com/package/npm)  |
| -------------------- | ---------------------------- | ----------------------------------------- |
| Install Dependencies | `yarn && cd client && yarn`  | `npm install && cd client && npm install` |
| Both client & server | `yarn dev`                   | `npm dev`                                 |
| Start server         | `yarn server`                | `npm server`                              |
| Start client         | `yarn client`                | `npm client`                              |
| Production Build     | `yarn dev:server`            | `npm dev:server`                          |

---

## **Tech Stack**

- Frontend ⇒ [ReactJS](https://reactjs.org/)
- Backend ⇒ [ExpressJS](https://expressjs.com/)
- Database ⇒ [Postgres](https://www.postgresql.org/) with [Sequelize](https://sequelize.org/)
- Host ⇒ [Heroku](https://www.heroku.com/)

---
