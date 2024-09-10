'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/pessoas', async (req, res) => {
  try {
    const pessoa = await db.Pessoa.create(req.body);
    res.status(201).json(pessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/pessoas', async (req, res) => {
  try {
    const pessoas = await db.Pessoa.findAll();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

module.exports = db;
