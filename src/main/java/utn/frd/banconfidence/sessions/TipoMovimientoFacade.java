/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utn.frd.banconfidence.sessions;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import utn.frd.banconfidence.entities.TipoMovimiento;

/**
 *
 * @author nicou
 */
@Stateless
public class TipoMovimientoFacade extends AbstractFacade<TipoMovimiento> {

    @PersistenceContext(unitName = "utn.frd_Banconfidence_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public TipoMovimientoFacade() {
        super(TipoMovimiento.class);
    }
    
}
