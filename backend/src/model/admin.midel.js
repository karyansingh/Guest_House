import db from "../db/config.js";

const AdminModel = {
    async getAll(columns, filter = {}) {

        const values = Object.values(filter);

        let whereClause = "";

        if (Object.keys(filter).length > 0) {
            whereClause = `
                WHERE ${Object.keys(filter)
                    .map(key => `${key} = ?`)
                    .join(" AND ")}
            `;
        }

        const [rows] = await db.execute(`
            SELECT
                ${columns.join(", ")}
            FROM admin
            ${whereClause}
            ORDER BY id DESC
        `, values);

        return rows;
    },
};

export default AdminModel;