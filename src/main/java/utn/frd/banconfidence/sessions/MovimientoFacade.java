/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utn.frd.banconfidence.sessions;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import utn.frd.banconfidence.entities.Movimiento;

/**
 *
 * @author nicou
 */
@Stateless
public class MovimientoFacade extends AbstractFacade<Movimiento> {

    @PersistenceContext(unitName = "utn.frd_Banconfidence_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public MovimientoFacade() {
        super(Movimiento.class);
    }

    public List<Movimiento> movimientosPorCuenta(long id) {
        return em.createNamedQuery("Movimiento.findByIdCuenta").setParameter("idCuenta", id).getResultList();
    }
    
    
    public List<Movimiento> movimientosPorCuentaUltimos(long id) {
        int largo = em.createNamedQuery("Movimiento.findByIdCuenta").setParameter("idCuenta", id).getResultList().size();
        return em.createNamedQuery("Movimiento.findByIdCuenta").setParameter("idCuenta", id).getResultList().subList(Math.max(largo-10,0), largo);
    }
    
    public double movimientosPorCuentaSaldo(long id) {
        List<Movimiento> movis = em.createNamedQuery("Movimiento.findByIdCuenta").setParameter("idCuenta", id).getResultList();
        int i;
        double saldo=0;
        for(i=0;i<movis.size();i++){
            saldo = saldo + movis.get(i).getImporte();
        }
    return saldo;
    }

    public List<Movimiento> movimientosPorCuentaEstado(long id, int estado) {
        return em.createNamedQuery("Movimiento.findByIdCuentaEstado").setParameter("idCuenta", id).setParameter("estado", estado).getResultList();
    }

    public List<Movimiento> movimientosPorCuentaTipo(long id, int tipo) {
       return em.createNamedQuery("Movimiento.findByIdCuentaTipo").setParameter("idCuenta", id).setParameter("tipo", tipo).getResultList();
    }
    
}
