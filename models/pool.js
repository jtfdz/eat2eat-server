const { Pool } = require('pg');

const pool = new Pool({
   uri: "postgres://busqoxhpfvxnjn:a7e85284633304afbee69415bc83bc096b77b4fe5a18f15ae8c5abb08eb531d5@ec2-23-20-168-40.compute-1.amazonaws.com:5432/d5o8mor31a0r5f",
   host: "ec2-23-20-168-40.compute-1.amazonaws.com",
   user: "busqoxhpfvxnjn",
   database: "d5o8mor31a0r5f",
   password: "a7e85284633304afbee69415bc83bc096b77b4fe5a18f15ae8c5abb08eb531d5",
   port: 5432,
   ssl: {
	    rejectUnauthorized: false
	  },
})

module.exports = {
getPool(){
     return pool
  },
}