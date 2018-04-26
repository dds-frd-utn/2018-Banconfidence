/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utn.frd.banconfidence.rest.services;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import utn.frd.banconfidence.entities.Movimiento;
import utn.frd.banconfidence.sessions.MovimientoFacade;
/**
 *
 * @author nicou
 */

@Path("/movimiento")
public class MovimientoRest {
    @EJB
    private MovimientoFacade ejbMovimientoFacade;

    //obtener todas las entidades
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movimiento> findAll(){
        return ejbMovimientoFacade.findAll();
    }
    
    //crear entidades
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void create(Movimiento movimiento){
        ejbMovimientoFacade.create(movimiento);
    }
    
    //actualizar entidades
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/{id}")
    public void edit(@PathParam("id")long id, Movimiento movimiento){
        ejbMovimientoFacade.edit(movimiento);
    }
    
    //eliminar entidades
    @DELETE
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    @Path("/{id}")
    public void remove(@PathParam("id")long id){
        ejbMovimientoFacade.remove( ejbMovimientoFacade.find(id) );
    }
    
        //obtener una entidad por id
    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Movimiento findById(@PathParam("id")int id){
        return ejbMovimientoFacade.find(id);
    }
    
    // obtener lista de movimientos por un id de cuenta
    @GET
    @Path("/cuenta/{id_cuenta}/todos")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movimiento> findByIdCuenta(@PathParam("id_cuenta")long id){
        return ejbMovimientoFacade.movimientosPorCuenta(id);
    }
    
    // obtener lista de los últimos 10 movimientos de un id de cuenta
    //List<Movimiento> ultimos = new ArrayList<>();
    @GET
    @Path("/cuenta/{id_cuenta}/ultimos")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movimiento> findByCuenta(@PathParam("id_cuenta")long id){
        //ultimos = ejbMovimientoFacade.movimientosPorCuenta(id);
        //return ultimos.subList(Math.max(ultimos.size() - 10, 0), ultimos.size());
        return ejbMovimientoFacade.movimientosPorCuentaUltimos(id);
    }
    
    // Obtener movimientos de una cuenta en un estado específico
    @GET
    @Path("/cuenta/{id_cuenta}/estado/{estado}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movimiento> movPorEstado(
            @PathParam("id_cuenta")long id,
            @PathParam("estado")int estado) {
        return ejbMovimientoFacade.movimientosPorCuentaEstado(id,estado);
    }
    
   // Obtener saldo de una cuenta a partir de la lista de movimientos
   @GET
   @Path("/cuenta/{id_cuenta}/saldo")
   @Produces({MediaType.APPLICATION_JSON})
   public double findByIdCuentaSaldo(@PathParam("id_cuenta")long id){
        return ejbMovimientoFacade.movimientosPorCuentaSaldo(id);
   }
    
   // Obtener movimientos de una cuenta según tipo
   // VER (ANDA)
    @GET
    @Path("/cuenta/{id_cuenta}/tipo/{tipo}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movimiento> movPorTipo(
            @PathParam("id_cuenta")long id,
            @PathParam("tipo")int tipo) {
        return ejbMovimientoFacade.movimientosPorCuentaTipo(id,tipo);
    }
    
}
