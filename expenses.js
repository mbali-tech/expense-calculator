module.exports = (db) => {

  const setName =  async(name) =>{
      name = name.toLowerCase().trim()
        let counter = await db.oneOrNone("select count(*) from users where name = $1",
          [name]
        );
        if (counter.count ==0) {
          await db.none("insert into users(name) values($1)", [name]);
          
        } else if (counter.count > 0) {
          return;
        }
      }
  
      const userId = async (name) => {
        name = name.toLowerCase().trim()
        let user = await db.oneOrNone("select * from users where name = $1", 
          [name]
        );
        if(user != null){
          return user.id
        }
      }
  
      const categoryId = async (category) => {
        let categoryy = await db.oneOrNone("select * from category where name = $1",
         [category]
        );
        if(user != null){
          return categoryy.id
        }
      } 
  
      const namesList = async () => {
          let list = await db.manyOrNone("select distinct name from users")
          return list
      }
      
      const returnCategory = async () => {
          let categoryResult = await db.manyOrNone('select * from categories')
      
      return categoryResult
      }
  
      const setExpenses = async (userId, categoriesId, amount, date) => {
          await db.none(
              "insert into expenses (users_id, category_id, date, amount) values ($1, $2, $3, $4)", [userId, categoriesId, date, amount])
      }
      const returnExpenses = async (name) => {
          const joinedResults = await db.manyOrNone("select * from users join expenses on user_id = category join expenses on category_id = expenses.users_id where expenses.categories_id = $1", [name])
          return joinedResults
      }
  
      {
      
          setName,
          setExpenses,
          returnExpenses,
          returnCategory,
          namesList,
          userId,
          categoryId
      }
  }
  