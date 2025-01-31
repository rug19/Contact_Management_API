export default class coreController {
  constructor(model) {
    this.model = model;
  }

  getAll = async (req, res) => {
    try {
      const items = await this.model.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.messagem });
    }
  };

  getById = async (req, res) => {
    try {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    try {
      console.log("Model:", this.model);
      const newItem = await this.model.create(req.body);
      res.status(201).json(newItem);
      console.log("Contact sucssfuly create");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      await item.update(req.body);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
      }
      await item.destroy();
      res.status(204).send();
      console.log("Contato deletado com sucesso!");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
