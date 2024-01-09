import { OrganizationController } from "../controllers/organization.controller";
import { Router } from "express";
import { authMiddleware } from "../middleware";
import { validationResult } from "express-validator";


const router = Router();
const orgController = new OrganizationController();

router.get(`/orgs`, async (req,res) => {
    try {
        const orgs = await orgController.getAll()
        return res.status(200).send(orgs);
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});
router.post(`/orgs`, async (req, res) => {
    const result = validationResult(req);

    if(! result.isEmpty()) return res.status(400).send({message: result.array()[0]});

    const org = await orgController.create(req.body);
    return res.status(201).send(org);

});
router.patch(`/orgs`, async (req, res) => {
    const result = await orgController.updateOrg(req.org.id, req.body);
    if(! result) return res.status(400).send({message: 'Error while updating the resource!!'});

    return res.status(200).send({message: `Organization updated successfully!!!`});
});
router.delete(`/orgs`, async (req, res) => {
    const result = await orgController.deleteOrg(req.org.id, req.body);

    if(! result) return res.status(200).send({message: 'Error while deleting the resource'});

    return res.status(200).send({message: 'Organization DEleted successfully!!'});
});

export default router;