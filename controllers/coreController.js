export default class coreController {
  constructor(model) {
    this.model = model;
  }

  async getAll(req, res) {
    try {
      const items = await this.model.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.messagem });
    }
  }

  async getById(req, res) {
    try {
      const item = await this.model.findByPK(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newItem = await this.model.creat(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await this.model.findByPK(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      await item.update(req.body);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const item = await this.model.findByPK(req.params.id);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
      }
      await item.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
