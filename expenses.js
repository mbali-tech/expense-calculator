module.exports = (db) => {

  const setName =  async(name) =>{
      name = name.toLowerCase().trim()
        let counter = await db.oneOrNone("select count(*) from users where firstname = $1",
          [name]
        );
        if (counter.count ==0) {
          await db.none("insert into users(firstname) values($1)", [name]);
          
        } else if (counter.count > 0) {
          return;
        }
      }
  
      const userId = async (name) => {
        name = name.toLowerCase().trim()
        let user = await db.oneOrNone("select * from users where firstname = $1", 
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
        if(categoryy != null){
          return categoryy.id
        }
      } 
  
      const namesList = async () => {
          let list = await db.manyOrNone("select distinct firstname from users")
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
          const joinedResults = await db.manyOrNone("select * from expenses join users on users.id = users_id join category on category.id = expenses.category_id where users.firstname = $1", [name])
          return joinedResults
      }
  
      return {
      
          setName,
          setExpenses,
          returnExpenses,
          returnCategory,
          namesList,
          userId,
          categoryId
      }
  }
  