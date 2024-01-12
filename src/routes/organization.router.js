import { OrganizationController } from "../controllers/index.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/index.js";
import { validationResult } from "express-validator";
import { isEmpty } from "bullmq";


const router = Router();
const orgController = new OrganizationController();

router.get(`/`, async (req,res) => {
    try {
        const orgs = await orgController.getAll();
        console.log(orgs);

        if(isEmpty(orgs)) return res.status(200).send({status: 'ok', message: 'No organizations found', data: []})

        return res.status(200).send({status: 'ok', message: 'Organizations found', data: orgs});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});
router.post(`/create`, async (req, res) => {
    const result = validationResult(req);

    if(! result.isEmpty()) return res.status(400).send({message: result.array()[0]});

    const org = await orgController.create(req.body);
    return res.status(201).send(org);

});
router.patch(`/:id`, async (req, res) => {
    const result = await orgController.updateOrg(req.body, req.params.id);
    if(! result) return res.status(400).send({status: false, message: 'Error while updating the resource!!', data: result});

    return res.status(200).send({message: `Organization updated successfully!!!`, data: result});
});
router.delete(`/:id`, async (req, res) => {
    const result = await orgController.deleteOrg(req.params.id, req.body);

    if(! result) return res.status(400).send({status: result, message: 'Error while deleting the resource'});

    return res.status(200).send({message: 'Organization Deleted successfully!!'});
});

export default router;