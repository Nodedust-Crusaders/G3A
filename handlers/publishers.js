const db = require("../models");

const getPublishers = async () => {
    try {
        const publishers = await db.Publisher.findAll();
        return publishers;
    } catch (err) {
        console.log("Error @handlers/getPublisher: ", err);
        return null;
    }
};

const getPublisher = async (id) => {
    try {
        const publisher = await db.Publisher.findByPk(id);
        return publisher;
    } catch (err) {
        console.log("Error @handlers/getPublisher: ", err);
        return null;
    }
};

const addPublisher = async (name) => {
    try {
        const publisher = await db.Publisher.findOne({
            where: {
                name: name
            }
        });

        if (publisher) {
            return {
                message: "There already exists a publisher with this name. Its ID is:" + publisher.id
            }
        }

        const newPublisher = await db.Publisher.create({
            name: name
        });
        return {
            message: "Success"
        };
    } catch (err) {
        console.log("Error @handlers/addPublisher:", err);
        return {
            message:err
        }
    }
}

const removePublisher = async (id) => {
    try {
        const publisher = await db.Publisher.findOne({
            where: {
                id: id
            }
        });

        if (!publisher) {
            return {
                message: "Publisher with id " + id + " does not exist"
            }
        }
        res = await db.Publisher.destroy({
            where: {
                id: publisher.id
            }
        })
        return {
            message: "Success"
        };
    } catch (err) {
        console.log("Error @handlers/addPublisher:", err);
        return err;
    }
}

const editPublisher = async (id, name) => {
    try {
        const publisher = await db.Publisher.findOne({
            where: {
                id: id
            }
        });

        if (!publisher) {
            return {
                message: "Publisher with id " + id + " does not exist"
            }
        }
        publisher.name = name;
        let res = await publisher.save()
        return {
            message: "Success"
        };
    } catch (err) {
        console.log("Error @handlers/editPublisher:", err);
        return err;
    }
}

module.exports = { getPublishers, getPublisher, addPublisher, removePublisher, editPublisher }