import db, { executeTransaction } from "../db/config.js";

const globalModel = {
    async select(
        tableName,
        columns,
        filter = {},
        orderByName,
        orderBy = "ASC",
        page = 1,
        limit = 10
    ) {
        // Pagination
        page = Math.max(parseInt(page) || 1);
        limit = Math.max(parseInt(limit) || 10);

        const offset = (page - 1) * limit;

        const values = Object.values(filter);

        let whereClause = "";

        if (Object.keys(filter).length > 0) {
            whereClause = `
                WHERE ${Object.keys(filter)
                    .map(key => `${key} = ?`)
                    .join(" AND ")}
            `;
        }

        // Get total records
        const [[countResult]] = await db.execute(
            `
            SELECT COUNT(*) AS total
            FROM ${tableName}
            ${whereClause}
            `,
            values
        );

        const totalRecords = countResult.total;
        const totalPages = Math.ceil(totalRecords / limit);

        // Get paginated records
        const [rows] = await db.execute(
            `
            SELECT
                ${columns.join(", ")}
            FROM ${tableName}
            ${whereClause}
            ORDER BY ${orderByName} ${orderBy}
            LIMIT ? OFFSET ?
            `,
            [...values, limit, offset]
        );

        if(rows.length>0){
            return {
                status:200,
                data: rows,
                pagination: {
                    currentPage: page,
                    limit,
                    totalRecords,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1
                }
            };
        }else{
            return {
                status:400
            }
        }
    },

    async insert(
        tableName,
        data,
        connection = null
    ) {

        try {

            // ------------------------------------------
            // Validate data
            // ------------------------------------------

            if (!data || typeof data !== "object") {
                throw new Error("Insert data must be an object");
            }

            const columns = Object.keys(data);

            if (columns.length === 0) {
                throw new Error("Insert data cannot be empty");
            }


            // ------------------------------------------
            // Values
            // ------------------------------------------

            const values = Object.values(data);

            const placeholders = columns
                .map(() => "?")
                .join(", ");


            // ------------------------------------------
            // SQL
            // ------------------------------------------

            const sql = `
                INSERT INTO ${tableName}
                (${columns.join(", ")})
                VALUES (${placeholders})
            `;


            // ------------------------------------------
            // Select DB connection
            // ------------------------------------------

            const executor = connection || db;


            // ------------------------------------------
            // Execute
            // ------------------------------------------

            const [result] = await executor.execute(
                sql,
                values
            );


            // ------------------------------------------
            // Return result
            // ------------------------------------------

            return {
                success: true,
                insertId: result.insertId,
                affectedRows: result.affectedRows
            };

        } catch (error) {

            return {
                success: false,
                error: error.message ?? error
            };
        }
    },

    
    async update(
    tableName,
    data,
    filter = {},
    connection = null
    ) {
        if (!data || typeof data !== "object") {
            throw new Error("Update data must be an object");
        }

        const dataKeys = Object.keys(data);

        if (dataKeys.length === 0) {
            throw new Error("Update data cannot be empty");
        }

        const filterKeys = Object.keys(filter);

        if (filterKeys.length === 0) {
            throw new Error(
                "Update requires at least one filter condition"
            );
        }

        const setClause = dataKeys
            .map(key => `${key} = ?`)
            .join(", ");

        const whereClause = filterKeys
            .map(key => `${key} = ?`)
            .join(" AND ");

        const values = [
            ...Object.values(data),
            ...Object.values(filter)
        ];

        const sql = `
            UPDATE ${tableName}
            SET ${setClause}
            WHERE ${whereClause}
        `;

        const executor = connection || db;

        const [result] = await executor.execute(
            sql,
            values
        );

        return {
            success: result.affectedRows > 0,
            affectedRows: result.affectedRows,
            changedRows: result.changedRows
        };
    },


    async delete(
        tableName,
        filter = {},
        connection = null
    ) {

        const filterKeys = Object.keys(filter);

        if (filterKeys.length === 0) {
            throw new Error(
                "Delete requires at least one filter condition"
            );
        }
        const whereClause = filterKeys
            .map(key => `${key} = ?`)
            .join(" AND ");


        const values = Object.values(filter);

        const sql = `
            DELETE FROM ${tableName}
            WHERE ${whereClause}
        `;

        const executor = connection || db;
   
        const [result] = await executor.execute(
            sql,
            values
        );

        return {
            success: result.affectedRows > 0,
            affectedRows: result.affectedRows
        };
    },


    async executeTransaction(callback, ...params) {

        return await executeTransaction(
            callback,
            ...params
        );
    }

};

export default globalModel;