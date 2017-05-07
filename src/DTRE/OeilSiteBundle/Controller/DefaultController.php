<?php

namespace DTRE\OeilSiteBundle\Controller;

use DTRE\OeilSiteBundle\Entity\ApiUser;
use DTRE\OeilSiteBundle\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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

    public function mediaAction()
    {
        return $this->render('DTREOeilSiteBundle:Default:media.html.twig');
    }

    public function apiAction(Request $request)
    {
        $user = $this->getUser();
        $form = $this
            ->get('form.factory')
            ->create(UserType::class,$user);


        if ($request->isMethod('POST') && $form->handleRequest($request)->isValid()){
            $em = $this
                ->getDoctrine()
                ->getManager();
            $user->setApiToken("Toto");
            $em->persist($user);
            $em->flush();

            $this
                ->addFlash(
                    'notice','Post Agenda crée'
                );

            return $this->redirectToRoute('dtre_oeil_site_homepage');
        } else {
            return $this->render('DTREOeilSiteBundle:Default:api.html.twig', array(
                'form'=>$form->CreateView(),
                'user'=>$user
            ));
        }
    }

    public function apitokenAction(Request $request)
    {
        if (!$request->isXmlHttpRequest()) {
            throw new BadRequestHttpException('Only ajax accepted');
        }
        if ($request->isMethod('POST') && $request->request->has('token')) {
            $em = $this->getDoctrine()->getManager();
            $user = $this->getUser();
            $user->setApiToken($request->request->get('token'));
            $em->persist($user);
            $em->flush();
            return new JsonResponse(array(
                'status' => 'ok',
            ));
        } else {
            throw new BadRequestHttpException('No token in request');
        }
    }

    public function graphicsAction()
    {
        $user = $this->getUser();
        return $this->render('DTREOeilSiteBundle:Default:graphics.html.twig', array(
            'token'=>$user->getApiToken(),
            'login'=>$user->getEmail(),
            'password'=>$user->getApiPassword()
        ));
    }
}
