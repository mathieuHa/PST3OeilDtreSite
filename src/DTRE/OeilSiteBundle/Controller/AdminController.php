<?php

namespace DTRE\OeilSiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AdminController extends Controller
{
    public function indexAction()
    {
        return $this->render('DTREOeilSiteBundle:Default:index.html.twig');
    }

    public function usersAction()
    {
        $users = $this
            ->getDoctrine()
            ->getRepository('DTREOeilSiteBundle:User')
            ->findAll();

        return $this->render('DTREOeilSiteBundle:Admin:users.html.twig', array(
            'users' => $users
        ));
    }

    public function deleteUserAction($id)
    {
        $user = $this
            ->getDoctrine()
            ->getRepository('DTREOeilSiteBundle:User')
            ->find($id);
        $users = $this
            ->getDoctrine()
            ->getRepository('DTREOeilSiteBundle:User')
            ->findAll();

        $em = $this
            ->getDoctrine()
            ->getManager();
        $em->remove($user);
        $em->flush();

        return $this->render('DTREOeilSiteBundle:Admin:users.html.twig', array(
            'users' => $users
        ));
    }

    public function graphicsAction()
    {
        return $this->render('DTREOeilSiteBundle:Default:graphics.html.twig');
    }
}
