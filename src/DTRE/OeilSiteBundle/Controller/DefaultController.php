<?php

namespace DTRE\OeilSiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('DTREOeilSiteBundle:Default:index.html.twig');
    }

    public function videoAction()
    {
        return $this->render('DTREOeilSiteBundle:Default:video.html.twig');
    }

    public function graphicsAction()
    {
        return $this->render('DTREOeilSiteBundle:Default:graphics.html.twig');
    }
}
