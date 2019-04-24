const pool = require('./db-pool');

module.exports = {
	getByID: async (id) => {
		const client = await pool.connect();
		try {
			const result = await client.query("SELECT * FROM student WHERE id = $1", [id]);
            client.release();
			return {success: true, data: result ? result.rows : []};
		} catch (e) {
            client.release();
			return {success: false, err: e};
		}
	},
	getByAccID: async (acc_id) => {
		const client = await pool.connect();
		try {
			const result = await client.query("SELECT * FROM student WHERE acc_id = $1", [acc_id]);
            client.release();
			return {success: true, data: result.rowCount !== 0 ? result.rows[0] : null};
		} catch (e) {
            client.release();
			return {success: false, err: e};
		}
	},
	getStudentsSpecializationByID: async(id) => {
		const client = await pool.connect();
		try {
			const result = await client.query(`SELECT * FROM specialization 
												WHERE id = 	(SELECT specialization_id FROM student
															WHERE student.id = ${id});`);
            client.release();
			return {success: true, data: result.rowCount !== 0 ? result.rows[0] : null};
		} catch (e) {
            client.release();
			return {success: false, err: e};
		}
	}

};