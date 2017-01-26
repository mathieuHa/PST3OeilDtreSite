<?php

namespace DTRE\OeilSiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('DTREOeilSiteBundle:Default:index.html.twig');
    }
}
